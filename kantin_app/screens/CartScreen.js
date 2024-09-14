import React from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet, FlatList } from 'react-native';

// Components
import Titles from '../components/titles';
import CategoryList from '../components/categoryList';
import { Button } from '../components/button';


const CATEGORY_DATA = [
  { id: '1',  imageSource: { uri: 'https://static.ah.nl/ah-static/images/logo-ah.png' } },
  { id: '2',  imageSource: { uri: 'https://cdn2.downdetector.com/static/uploads/logo/Jumbo_Logo.png' } },
  { id: '3',  imageSource: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/1200px-Lidl-Logo.svg.png' } },
  { id: '4',  imageSource: { uri: 'https://www.superunie.nl/app/uploads/2019/09/PLUS_RGB_2016_diap-plane.jpg' } },
  { id: '5',  imageSource: { uri: 'https://www.superunie.nl/app/uploads/2022/03/Dirk.jpg' } },
  { id: '6',  imageSource: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHJmkTzBbaIrMJ518afum-3dV5ngM4Sv_0w&s' } },
  { id: '7',  imageSource: { uri: 'https://banner2.cleanpng.com/20180613/hkz/kisspng-spar-sterreichische-warenhandels-ag-logo-retail-supply-5b2157adb050b9.6550246915289117897222.jpg' } },
  { id: '8',  imageSource: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BH5YS6a0rhDxAnCjjg3zxGYfa8rgzfVU4w&s' } },
  { id: '9',  imageSource: { uri: 'https://klimaatgerust.nl/wp-content/uploads/2020/02/ekoplazalogo.png' } },
  // Add more items as needed
];

const DATA = [
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
  { id: '4', text: 'Item 4' },
  { id: '5', text: 'Item 5' },
  { id: '3', text: 'Item 3' },
  { id: '4', text: 'Item 4' },
  { id: '5', text: 'Item 5' },
  // Add more items as needed
];

export default function CartScreen() {

  const handleSelect = (id) => {
    console.log('Selected category ID:', id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Titles type="bigTitle" title="My Cart" />
        </View> 
        <View style={styles.section}>
          <CategoryList onSelect={handleSelect} CATEGORY_DATA={CATEGORY_DATA} />
        </View>

        {/* FlatList should fill the remaining space */}
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Titles type="sectionTitle" title={item.text} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.price}>
            <Titles type="sectionTitle" title="Total price:" />
            <Titles type="sectionTitle" title="$100" />
          </View>
          <Button title="Order on website" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    padding: 16,
  },

  section: {
    marginVertical: 6,
  },
  list: {
    flex: 1, // Make the FlatList take the remaining space
  },
  listContent: {
    paddingBottom: 20, // Add space at the bottom for the footer
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  item: {
    padding: 20,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
});
