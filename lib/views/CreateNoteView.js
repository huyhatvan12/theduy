import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Appbar from '../components/Appbar';
import Note from '../models/NoteModel';
import MapService from '../services/MapService';

const pushBack = createNoteView => 
  createNoteView.props.navigation.goBack;

const setText = (createNoteView, newState) => {
  const { note } = createNoteView.state;
  const newNote = new Note(MapService.clearNull({
    id: newState?.id || note.id,
    title: newState?.title || note.title,
    content: newState?.content || note.content,
    createdAt: newState?.createdAt || note.createdAt
  }));

  createNoteView.setState({
    note: newNote
  });
}

class CreateNoteView extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      pushBack: pushBack(this),
      note: props.route.params,
      isLoading: false
    }
  }

  render () {
    return (
      <View>
        <Appbar
          data={{ title: this.state.note.title }}
          actions={{
            leading: this.state.pushBack,
            trailing: async () => {
              await this.updateNote();
              this.state.pushBack();
            }
          }}/>
        <View style={styles.container}>
          {this.state.isLoading ? 
            <ActivityIndicator style={styles.loadingIndicator}/> : <></>}
          <TextInput
            label='Tiêu đề'
            style={styles.title}
            placeholder='Tiêu đề'
            value={this.state.note.title}
            onChangeText={text => setText(this, { 'title': text })}/>
          <TextInput
            label='Nội dung'
            multiline={true}
            placeholder='Nội dung'
            style={styles.content}
            value={this.state.note.content}
            onChangeText={text => setText(this, { 'content': text })}/>
        </View>
      </View>
    );
  }

  setIsLoading = state => 
    this.setState({ isLoading: state });

  updateNote = async () => {
    this.setIsLoading(true);
    await this.state.note?.update();
    this.setIsLoading(false);
  }
}

const height = Dimensions.get('window').height;
const textInputStyle = {
  backgroundColor: 'white'
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  title: {
    ...textInputStyle,
    fontWeight: '700',
    height: height * 0.08,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  content: {
    ...textInputStyle,
    height: height * 0.92,
    textAlignVertical: 'top',
  },
  loadingIndicator: {
    position: 'absolute',
    left: '50%',
    top: '50%'
  }
});

export default CreateNoteView;