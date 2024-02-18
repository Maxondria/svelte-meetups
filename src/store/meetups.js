import { writable } from "svelte/store";

export const databaseURL =
  "https://svelte-meetups-c3451-default-rtdb.firebaseio.com";

const meetups = writable([]);

/**
 * @typedef {Object} Meetup
 * @property {string} id
 * @property {boolean} isFavorite
 * @property {string} title
 * @property {string} subtitle
 * @property {string} description
 * @property {string} imageUrl
 * @property {string} address
 * @property {string} contactEmail
 */

/**
 * @typedef {Object} WritableStore
 * @property {(value: Meetup[]) => void} set
 * @property {(updater: (value: Meetup[]) => Meetup[]) => void} update
 * @property {(subscriber: (value: Meetup[]) => void) => () => void} subscribe
 */

/**
 * @typedef {Object} MeetupsStore
 * @property {(value: Meetup[]) => void} set
 * @property {(meetup: Meetup) => void} add
 * @property {(id: string, updatedMeetup: Meetup) => void} edit
 * @property {(id: string) => void} remove
 * @property {(idFav: string) => void} makeFavorite
 * @property {(subscriber: (value: Meetup[]) => void) => () => void} subscribe
 */

/** @type {MeetupsStore} */
export const meetupsStore = {
  subscribe: meetups.subscribe,
  set: meetups.set,
  add: (meetup) => meetups.update((items) => [meetup, ...items]),
  edit: (id, updatedMeetup) =>
    meetups.update((items) =>
      items.map((meetup) => {
        if (meetup.id === id) {
          return { ...meetup, ...updatedMeetup };
        }
        return meetup;
      })
    ),
  remove: (id) =>
    meetups.update((items) => items.filter((meetup) => meetup.id !== id)),
  makeFavorite: (idFav) =>
    meetups.update((items) =>
      items.map((meetup) => {
        if (meetup.id === idFav) {
          return { ...meetup, isFavorite: !meetup.isFavorite };
        }
        return meetup;
      })
    ),
};
