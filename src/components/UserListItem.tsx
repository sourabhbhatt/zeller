import React, {memo, useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../assets/colors';
import FONTS from '../assets/fonts';
import {formatRole} from '../utils/helpers';
import {useUser} from '../context/UserContext';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

type UserListItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetails'
>;

interface UserListItemProps {
  name?: string;
  role?: string;
  email?: string;
}

const UserListItem: React.FC<UserListItemProps> = ({
  name = 'Unknown',
  role = 'Role Unknown',
  email = '',
}) => {
  const navigation = useNavigation<UserListItemNavigationProp>();
  const {setSelectedUser} = useUser();

  const handlePress = useCallback(() => {
    setSelectedUser({name, email, role});
    navigation.navigate('UserDetails');
  }, [navigation, setSelectedUser, name, role, email]);

  const getInitial = useMemo(() => {
    if (!name || typeof name !== 'string') return '?';
    return name.trim().charAt(0).toUpperCase();
  }, [name]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitial}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{name.trim() || 'Unknown'}</Text>
        {/* using formatRole function bcoz, 'capitalize' will not work here */}
        <Text style={styles.userRole}>{formatRole(role).trim()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(UserListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 25,
    fontFamily: FONTS.MEDIUM,
    color: Colors.primary,
  },
  infoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: FONTS.MEDIUM,
  },
  userRole: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.REGULAR,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
});
