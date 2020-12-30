module.exports = {
    hasLevelInNickname(nickname) {
        if (!nickname.toLowerCase().match(/\(l[0-9]{1,2}\)$/g)) return false;
        return true;
    },

    getLvlFromNickname(nickname) {
        if (!this.hasLevelInNickname(nickname)) return null;
        return nickname.toLowerCase().match(/\(l[0-9]{1,2}\)$/g)[0].toUpperCase();
    },

    botUptime(ms, intOnly) { // Returns an object with formatted times
        const seconds = ms / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;

        let object = {};

        if (intOnly) {
            object = {
                ms,
                seconds: parseInt(seconds),
                minutes: parseInt(minutes),
                hours: parseInt(hours),
                days: parseInt(days)
            };
        } else {
            object = {
                ms,
                seconds,
                hours,
                days
            };
        }

        return object;
    }
};
