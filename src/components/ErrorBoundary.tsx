import React, {Component, ErrorInfo, ReactNode} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Linking,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Images from '../assets/images';
import Colors from '../assets/colors';

interface ErrorBoundaryProps {
  children: ReactNode;
  ENV?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
    this.setState({hasError: true, error});
  }

  handleRestartPress = () => {
    try {
      const deepLink = 'zeller.app.link'; // for deep linking...
      Linking.openURL(deepLink);
    } catch (e) {
      console.error('Error while handling restart press:', e);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.mainContainer}>
            <Image source={Images.sadRobot} style={styles.img} />
            <Text style={styles.errorTitle}>Oops .... !</Text>
            <Text style={styles.errorDesc}>Something went wrong.</Text>
            <Text style={styles.errorDesc}>Sorry about that.</Text>

            <TouchableOpacity
              style={styles.restartButton}
              onPress={this.handleRestartPress}>
              <Text style={styles.buttonText}>{`Restart App`}</Text>
            </TouchableOpacity>

            {/* Show error details in non-production mode */}
            {this.props.ENV !== 'prod' && this.state.error && (
              <ScrollView style={styles.scrollContainer}>
                <Text style={styles.errorCode}>
                  {JSON.stringify(this.state.error, null, 2)}
                </Text>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      );
    } else {
      return <View style={styles.childrenWrapper}>{this.props.children}</View>;
    }
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainContainer: {
    alignItems: 'center',
  },
  img: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 28,
    color: Colors.text,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorDesc: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  restartButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  childrenWrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    width: '100%',
    maxHeight: 200,
    padding: 10,
    marginTop: 10,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  errorCode: {
    fontSize: 14,
    color: Colors.error,
  },
});
