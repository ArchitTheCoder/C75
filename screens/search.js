import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler'

import db from '../config';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      search: '',
      lastVisibleTransaction: null,
    };
  }

  fetchMoreTransactions = async () => {
    var text = this.state.search
    var enteredText = text.split('');

    if (enteredText[0] === 'B') {
      const query = await db
        .collection('transactions')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();

      query.docs.map((doc) => {
        this.setState({
          allTransaction: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredText[0] === 'S') {
      const query = await db
        .collection('transactions')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();

      query.docs.map((doc) => {
        this.setState({
          allTransaction: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  searchTransaction = async (text) => {
    var enteredText = text.split('');

    if (enteredText[0] === 'b') {
      const query = await db
        .collection('transactions')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();

      query.docs.map((doc) => {
        this.setState({
          allTransaction: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredText[0] === 's') {
      const query = await db
        .collection('transactions')
        .where('bookId', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();

      query.docs.map((doc) => {
        this.setState({
          allTransaction: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  componentDidMount = async () => {
    const query = await db.collection('transactions').get();

    query.docs.map((doc) => {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc,
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', margin: 20 }}>
          <TextInput
            placeholder="Search"
            style={{
              marginTop: 100,
              width: 200,
              height: 40,
              borderWidth: 1.5,
              fontSize: 20,
            }}
            onChangeText={(text) => {
              this.setState({ search: text });
            }}
            value={this.state.search}
          />

          <TouchableOpacity
            style={{
              marginTop: 100,
              backgroundColor: 'lightgreen',
              width: 50,
              borderWidth: 1.5,
              borderLeftWidth: 0,
            }}
            onPress={() => {
              this.searchTransaction(this.state.search);
            }}>
            <Text style={{ textAlign: 'center', marginTop: 10 }}> Submit </Text>
          </TouchableOpacity>
        </View>

        <FlatList>
          data = {this.state.allTransactions}
          renderItem ={' '}
          {({ item }) => (
            <View style={{ borderBottomWidth: 2 }}>
              <Text>{'Book Id: ' + item.bookId} </Text>
              <Text>{`Student Id: ${item.studentId}`}</Text>
              <Text>{'Date: ' + item.date.toDate()}</Text>
              <Text>{'Transaction Type: ' + item.transactionType}</Text>
            </View>
          )}
          keyExtractor = {(item, index) => index.toString()}
          onEndReached = {this.fetchMoreTransactions()}
          onEndReachThreshold = {0.7}
        </FlatList>
      </View>
    );
  }
}
