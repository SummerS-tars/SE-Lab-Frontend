import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', () => {

    const profileList = {};

    function setProfile(profile) {
        profileList[profile.value.id]=profile;
    }

    function getProfile(id) {
        return profileList[id];
    }

  return { setProfile,getProfile };
});
