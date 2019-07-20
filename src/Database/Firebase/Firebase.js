import {initConfig} from '../../private/firebaseConfig'
import * as firebase from 'firebase/app';

const defaultConfVal = "Setup project specific firebase config!";

const config = {
    apiKey: initConfig.apiKey || defaultConfVal,
    authDomain: initConfig.authDomain || defaultConfVal,
    databaseURL: initConfig.databaseURL || defaultConfVal,
    projectId: initConfig.projectId || defaultConfVal,
    storageBucket: initConfig.storageBucket || defaultConfVal,
    messagingSenderId: initConfig.messagingSenderId || defaultConfVal,
    appId: initConfig.appId || defaultConfVal
};

const fbApp =  firebase.initializeApp(config);
/* const firebaseDB = fbApp.database();
const firebaseAuth = fbApp.auth(); */
console.log("firebase init");
 

export default fbApp;