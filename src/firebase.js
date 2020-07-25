import firebase from 'firebase/app';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyDz3iK_UVRq12G9x8unhH1M3SDy7tjXol4',
	authDomain: 'xendit-6fae1.firebaseapp.com',
	databaseURL: 'https://xendit-6fae1.firebaseio.com',
	projectId: 'xendit-6fae1',
	storageBucket: 'xendit-6fae1.appspot.com',
};
  
firebase.initializeApp(config);

export default firebase;