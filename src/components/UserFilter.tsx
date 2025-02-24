import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import RadioButton from './RadioButton';
import {AppResources} from '../utils/resources';

interface UserFilterProps {
  setUserType: (type: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({setUserType}) => {
  const [selectedType, setSelectedType] = useState(AppResources.userTypes[0]);

  return (
    <View style={styles.container}>
      {AppResources.userTypes.map(type => (
        <RadioButton
          key={type}
          label={type}
          selected={selectedType === type}
          onPress={() => {
            setSelectedType(type);
            setUserType(type);
          }}
        />
      ))}
    </View>
  );
};

export default UserFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
