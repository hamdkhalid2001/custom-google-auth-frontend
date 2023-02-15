import { observable } from 'mobx';

const store = observable({
  currentUserData:{},
  jwtToken:""
});

export default store;
