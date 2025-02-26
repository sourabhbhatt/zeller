import React, {FC, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import FONTS from '../assets/fonts';
import Colors from '../assets/colors';
import Header from '../components/Header';
import {formatRole} from '../utils/helpers';
import {useUser} from '../context/UserContext';

const UserDetailsScreen: FC = () => {
  const {selectedUser} = useUser();

  if (!selectedUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="User Details" showBackButton />
      <View style={styles.detailsContainer}>
        {selectedUser.name && (
          <>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{selectedUser.name}</Text>
          </>
        )}

        {selectedUser.email && (
          <>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{selectedUser.email}</Text>
          </>
        )}
        {selectedUser.role && (
          <>
            <Text style={styles.label}>Role:</Text>
            <Text style={styles.value}>
              {selectedUser.role ? formatRole(selectedUser.role) : ''}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default memo(UserDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  detailsContainer: {
    margin: 10,
    padding: 20,
    borderRadius: 2,
    backgroundColor: Colors.bgColor,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.SEMIBOLD,
    color: Colors.text,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: Colors.textSecondary,
  },
  errorText: {
    textAlign: 'center',
    color: Colors.error,
    fontSize: 18,
  },
});
