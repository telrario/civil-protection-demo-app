import { defineStore } from 'pinia'

export interface UserInterface{
  name: string,
  email: string,
  profilePhoto: string,
}

export interface StateInterface{
  user: UserInterface | null,
}

export const useSessionStore = defineStore('session', {
  state: (): StateInterface => ({
    user: null,
  }),
  actions: {
    store(user: UserInterface){
      this.user = user;

      sessionStorage.setItem('user', JSON.stringify(this.user));

      console.log('session stored', sessionStorage.getItem('user'));
    },

    read(): UserInterface {
      const user: string = sessionStorage.getItem('user');

      try {
        this.user = JSON.parse(user);

        console.log('session read');
      }
      catch (ex){
        this.delete();
      }
    },

    delete() {
      this.user = null;

      sessionStorage.removeItem('user');

      console.log('session deleted');
    },
  }
})
