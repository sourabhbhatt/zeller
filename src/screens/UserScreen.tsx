import React, {memo, useState} from 'react';
import {TextInput, StyleSheet, Text} from 'react-native';

import Colors from '../assets/colors';
import Header from '../components/Header';
import UserList from '../components/UserList';
import {AppResources} from '../utils/resources';
import UserFilter from '../components/UserFilter';

// import {RootState} from '../redux/store';
// import {useDispatch, useSelector} from 'react-redux';
// import {setSearchQuery, setUserType} from '../redux/slices/userSlice';

const UserScreen = () => {
  // const dispatch = useDispatch();
  // const userType = useSelector((state: RootState) => state.user.userType);
  // const searchQuery = useSelector((state: RootState) => state.user.searchQuery);
  const [userType, setUserType] = useState('Admin');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header title="Home Screen" />
      <UserFilter setUserType={setUserType} />
      <Text style={styles.inputTitle}>{AppResources.inputTitle}</Text>
      <TextInput
        maxLength={30}
        value={searchQuery}
        style={styles.textInput}
        placeholder={`Search Users...`}
        placeholderTextColor={Colors.textSecondary}
        onChangeText={setSearchQuery}
      />
      <UserList
        userType={userType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
};

export default memo(UserScreen);

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
    marginHorizontal: 14,
    color: Colors.textSecondary,
  },
  textInput: {
    padding: 14,
    marginHorizontal: 10,
    color: Colors.text,
    backgroundColor: Colors.bgColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
