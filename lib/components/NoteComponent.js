import React from 'react';
import { 
  StyleSheet, 
  Text, 
  ToastAndroid, 
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import DateService from '../services/DateService';
import DateTimePickerModel from 'react-native-modal-datetime-picker';
import RNCalendarEvents from "react-native-calendar-events";

class NoteComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      hasPermission: false,
      scheduledDate: new Date(),
      isDateTimePickerVisible: false,
      menuButtons: [
        {
          text: 'Nhắc lịch',
          backgroundColor: 'darkviolet',
          onPress: () => this.setPickerVisibleState(true)
        },
        {
          text: 'Xóa',
          type: 'delete',
          onPress: this.deleteNote
        }
      ]
    }
  }

  render () {
    return (
      <View>
        <DateTimePickerModel
          mode='date'
          is24Hour={true}
          onConfirm={this.setScheduledDate}
          isVisible={this.state.isDateTimePickerVisible}
          onCancel={() => this.setPickerVisibleState(false)}/>
        <Swipeout
          sensitivity={10}
          autoClose={true}
          style={styles.container}
          right={this.state.menuButtons}>
          <TouchableOpacity
            onPress={this.props.onPress}>
            <View style={styles.content}>
              <Text style={styles.title}>{this.props.data.title}</Text>
              <Text>{this.props.data.content}</Text>
              {!!this.props.data.createdAt &&
                <Text style={styles.createdAt}>
                  {DateService.msToDate(this.props.data.createdAt)}
                </Text>}
            </View>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  }

  deleteNote = async () => {
    const status = await this.props.data.remove();
    const msg = `Xóa ${status ? 'thành công' : 'thất bại'}`;
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  setPickerVisibleState = state => this.setState({
    isDateTimePickerVisible: state
  });

  setScheduledDate = date => {
    this.setState({
      scheduledDate: date
    });

    this.setPickerVisibleState(false);

    // if (await this.checkCalenderPermission()) {
    //   RNCalendarEvents.saveEvent(this.state.note.title, {
    //     endDate: this.state.scheduledDate,
    //     startDate: this.state.scheduledDate,
    //   });
    // }
  }

  checkCalenderPermission = async () => {
    const checkPermission = result => 
      result === 'denied' || result === 'undetermined';
    try {
      const result = await RNCalendarEvents
        .checkPermissions(false);
      const isDenied = checkPermission(result);
    
      !!isDenied || await RNCalendarEvents
        .requestPermissions(false);
      
      this.setState({
        hasPermission: checkPermission(await RNCalendarEvents
          .checkPermissions(false))
      });
    } catch (e) {
      console.error(e);
    }
  }
}

const styles = StyleSheet.create({
  title: { fontWeight: '700' },
  container: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: '#f3f3f3',
  },
  content: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  createdAt: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'right'
  }
});

export default NoteComponent;