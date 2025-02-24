import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../assets/colors';
import FONTS from '../assets/fonts';
import {formatRole} from '../utils/helpers';

interface UserListItemProps {
  name?: string;
  role?: string;
}

const UserListItem: React.FC<UserListItemProps> = ({
  name = 'Unknown',
  role = 'Role Unknown',
}) => {
  const getInitial = () => {
    if (!name || typeof name !== 'string') return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitial()}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{name.trim() || 'Unknown'}</Text>
        {/* using formatRole function bcoz, 'capitalize' will not work here */}
        <Text style={styles.userRole}>{formatRole(role).trim()}</Text>
      </View>
    </View>
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
