import React, {FC, useState, useCallback, memo} from 'react';
import {View, FlatList, RefreshControl, StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import Loader from './Loader';
import Colors from '../assets/colors';
import UserListItem from './UserListItem';
import {GET_USERS} from '../graphql/queries';

interface User {
  id: string;
  name: string;
  role: string;
}

interface UserListProps {
  userType: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const UserList: FC<UserListProps> = ({
  userType,
  searchQuery,
  setSearchQuery,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {loading, error, data, refetch} = useQuery(GET_USERS, {
    variables: {
      role: userType ? {eq: userType.toUpperCase()} : undefined,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      setSearchQuery('');
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  const filteredUsers =
    data?.listZellerCustomers?.items?.filter((user: User) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const renderItem = useCallback(({item}: {item: User}) => {
    return <UserListItem name={item.name} role={item.role} />;
  }, []);

  if (error)
    return <Text style={styles.errorText}>{`Error: ${error.message}`}</Text>;

  return (
    <View style={styles.container}>
      <Loader visible={loading} overlay message={`fetching ${userType}s...`} />
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyListText}>{`No users found`}</Text>
          ) : null
        }
        contentContainerStyle={[
          styles.listContainer,
          filteredUsers.length === 0 && styles.centeredEmptyText,
        ]}
      />
    </View>
  );
};

export default memo(UserList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  listContainer: {
    paddingVertical: 16,
  },
  centeredEmptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: Colors.error,
    marginTop: 20,
    fontSize: 16,
  },
  emptyListText: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 16,
    marginTop: 20,
  },
});
