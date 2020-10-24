import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl
} from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';
import NoteComponent from '../components/NoteComponent';
import Note from '../models/NoteModel';

const renderNoteList = (homeView, notes) => 
  notes.map(note => <NoteComponent
    key={note.id}
    data={note}
    onPress={() => goToCreateNote(homeView, note)}
  />);

const goToCreateNote = (homeView, note) => 
  homeView.props.navigation.push('CreateNote', note || new Note());

class HomeView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      notes: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.getNotes();
  }

  render () {
    return (
      <View>
        <ScrollView
          key='id'
          style={styles.container}
          refreshControl={this.refreshController()}
          children={renderNoteList(this, this.state.notes)}/>
        <FloatingActionButton 
          onPress={() => goToCreateNote(this)}/>
      </View>
    );
  }
  
  setIsLoading = state => this.setState({
    isLoading: state
  });

  refreshController = () => {
    const onRefresh = async () => {
      this.setIsLoading(true);
      await this.getNotes();
      this.setIsLoading(false);
    }

    return <RefreshControl
      refreshing={this.state.isLoading}
      onRefresh={onRefresh}/>
  }

  getNotes = async () => {
    const _notes = await Note.getNotes();
    this.setState({
      notes: _notes
    });
  }
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  appBar: {
    height: screenHeight * 0.12
  },
  container: {
    backgroundColor: 'white',
    height: screenHeight * 1
  }
});

export default HomeView;