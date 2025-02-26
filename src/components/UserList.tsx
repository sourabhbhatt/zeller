import React, {FC, useState, useCallback, memo} from 'react';
import {View, FlatList, RefreshControl, StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import Loader from './Loader';
import Colors from '../assets/colors';
import UserListItem from './UserListItem';
import {GET_ALL_USERS, GET_USERS} from '../graphql/queries';
import Button from './Button';

// import {RootState} from '../redux/store';
// import {useSelector, useDispatch} from 'react-redux';
// import {setUserType, setSearchQuery} from '../redux/slices/userSlice';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface GetUsersResponse {
  listZellerCustomers: {
    items: User[];
    nextToken?: string;
  };
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
  // const dispatch = useDispatch();
  // const userType = useSelector((state: RootState) => state.user.userType);
  // const searchQuery = useSelector((state: RootState) => state.user.searchQuery);

  const [refreshing, setRefreshing] = useState(false);

  const {loading, error, data, refetch} = useQuery<GetUsersResponse>(
    userType ? GET_USERS : GET_ALL_USERS,
    {
      variables: {
        role: userType ? {eq: userType.toUpperCase()} : undefined,
      },
      // fetchPolicy helps optimize performance by ensuring the UI remains responsive while fetching the latest data.
      fetchPolicy: 'cache-and-network', // Uses cache, then updates from API
    },
  );

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
    return (
      <UserListItem name={item.name} role={item.role} email={item.email} />
    );
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return !loading ? (
      <Text style={styles.emptyListText}>No users found</Text>
    ) : null;
  }, [loading]);

  if (error)
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{`Error: ${error.message}`}</Text>;
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );

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
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={[
          styles.listContainer,
          data?.listZellerCustomers?.items.length === 0 &&
            styles.centeredEmptyText,
        ]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        windowSize={5}
        getItemLayout={(data, index) => ({
          length: 70, // Approximate height of each item
          offset: 70 * index,
          index,
        })}
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
  errorContainer: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
