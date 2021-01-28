import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC_WBfMxWV3G9afr1L2xU1stHlj0TEyiE8",
    authDomain: "todolist-8dfa2.firebaseapp.com",
    projectId: "todolist-8dfa2",
    storageBucket: "todolist-8dfa2.appspot.com",
    messagingSenderId: "292456331914",
    appId: "1:292456331914:web:223ea065af8050b0134b73"
  };

class Fire {
    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    })
            }
        })
    }

    getLists(callback) {
        let ref = this.ref.orderBy('name')
        
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            })
            
            callback(lists)
        })
    }

    addList(list) {
        let ref = this.ref

        ref.add(list)
    }

    updateList(list) {
        let ref = this.ref

        ref.doc(list.id).update(list)
    }

    get userId() {
        return (firebase.auth().currentUser.uid)
    }

    get ref()
    {
        return firebase
            .firestore()
            .collection('users')
            .doc(this.userId)
            .collection('lists')
    }

    detach() {
        this.unsubscribe()
    }
}

export default Fire;