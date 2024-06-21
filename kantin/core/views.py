import re
import requests
import json
from rest_framework.response import Response
from rest_framework.views import APIView
from googletrans import Translator
import logging
import time 


class GetItemsView(APIView):
    data = '/home/balage/Documents/Projects/Kantin/kantin/core/assets/supermarkets.json'

    with open(data, 'r') as f: 
        items = json.load(f)

    shoppingList = {
        'store': '',
        'items': [],
        'fullprice': 0,
    }

    options = []

    unitofmeasures = [
        {"unit": "gram", "name": "gram", "conversion": 1},
        {"unit": "gram", "name": "gr", "conversion": 1},
        {"unit": "gram", "name": "g", "conversion": 1},
        {"unit": "gram", "name": "kilogram", "conversion": 1000},
        {"unit": "gram", "name": "kilo", "conversion": 1000},
        {"unit": "gram", "name": "kg", "conversion": 1000},
        {"unit": "gram", "name": "k", "conversion": 1000},
        {"unit": "gram", "name": "pond", "conversion": 500},
        {"unit": "milliliter", "name": "milliliter", "conversion": 1},
        {"unit": "milliliter", "name": "mililiter", "conversion": 1},
        {"unit": "milliliter", "name": "ml", "conversion": 1},
        {"unit": "milliliter", "name": "liter", "conversion": 1000},
        {"unit": "milliliter", "name": "l", "conversion": 1000},
        {"unit": "milliliter", "name": "deciliter", "conversion": 100},
        {"unit": "milliliter", "name": "dl", "conversion": 100},
        {"unit": "milliliter", "name": "centiliter", "conversion": 10},
        {"unit": "milliliter", "name": "cl", "conversion": 10},
    ]

    unitofmeasure_pattern = re.compile(r"([\d\.,]+)\s?(" + "|".join(unit["name"] for unit in unitofmeasures) + ")", re.IGNORECASE)

    def get_amount(self, value):
        amount = self.unitofmeasure_pattern.search(value)
        if amount:
            return amount.group(0)
        else:
            return None
         
    #this should convert whatever unit we have in the product and search params and convert them to the lowest possible unit
    def convert_amount_to_base(self, value):
        if value and self.unitofmeasure_pattern.search(value):
            amount, unit_name = self.unitofmeasure_pattern.search(value).groups()

            # Check if the unit is "per pakkett", and if so, return the original value
            for unit in self.unitofmeasures:
                if unit_name.lower() == unit['name']:
                    amount = float(amount.replace(',', '.')) * unit['conversion']
                    unit_name = unit['unit']
                    value = str(amount) + " " + unit_name

        return value


    # this should compare the product's value and the query's value
    def compare_minimum_amounts(self, product_amount: str, search_amount: str) -> bool:

        product_amount_pattern = r"([0-9]+)"
        search_amount_pattern = r"([0-9]+)"
        product_unit_pattern = r"([a-z]+)"
        search_unit_pattern = r"([a-z]+)"

        product_amount_match = re.search(product_amount_pattern, product_amount)
        search_amount_match = re.search(search_amount_pattern, search_amount)
        product_unit_match = re.search(product_unit_pattern, product_amount)
        search_unit_match = re.search(search_unit_pattern, search_amount)

        if product_amount_match and search_amount_match:
            product_amount_value = int(product_amount_match.group(1))
            search_amount_value = int(search_amount_match.group(1))

            if product_unit_match and search_unit_match:
                product_amount_unit = product_unit_match.group(0).lower()
                search_amount_unit = search_unit_match.group(0).lower()

                if product_amount_unit == search_amount_unit and abs(product_amount_value - search_amount_value) <= 1:
                    return True
        return False


    def find_product(self, products, value):
        for store in range(len(products)):

            shoppingList = {
                'store': products[store]['n'],
                'items': [],
                'fullprice': 0,
            }

            for v in value:
                # Remove the amount from the value if it exists
                amount = self.get_amount(v)
                if amount:
                    v = v.replace(amount, "")

                product_matches = []

                query_words = v.lower().split()

                # Find products that include all words from the query
                product_matches = [product for product in products[store]['d'] if all(word in product['n'].lower() for word in query_words)]

                # Fallback: If there were no matches, find all products that include letters from "value" in the same order as they appear in the original.
                if not product_matches:
                    product_matches = [product for product in products[store]['d'] if all(c in product['n'].lower() for c in v.lower())]

                # When an amount is specified, return the product that meets this minimum amount.
                if amount:
                    base_amount = self.convert_amount_to_base(amount)
                    product_matches = [product for product in product_matches if self.compare_minimum_amounts(self.convert_amount_to_base(product['s']), base_amount)]

                # Order product match by length similarity to query value
                product_matches.sort(key=lambda product: abs(len(product['n']) - len(v)))

                # Sort the top 5 product matches by price
                top_product_matches = sorted(product_matches[:1], key=lambda product: product['p'])


                for product in top_product_matches:
                    shoppingList['items'].append(product)
                    shoppingList['fullprice'] += product['p']

            self.options.append(shoppingList)


    def get(self, request):
        self.options = []
        query = request.query_params.get('query')
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)

        query_list = [q.strip().replace('+', '').replace('%20', '') for q in query.split(',')]

        translator = Translator()
        translated_query_list = []

        # for q in query_list:
        #     translated_query = translator.translate(q, src='en', dest='nl').text
        #     translated_query_list.append(translated_query)
        #     time.sleep(0.3)  # Add a sleep of 0.3 seconds between translations

        items_copy = self.items.copy()
        self.find_product(items_copy, query_list)

        # Remove items from options where fullprice is 0
        self.options = [option for option in self.options if option['fullprice'] != 0]

        # Order the options list by the fullprice attribute in ascending order
        self.options.sort(key=lambda x: x['fullprice'])

        return Response(self.options, status=200)