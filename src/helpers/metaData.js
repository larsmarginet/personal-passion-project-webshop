const home = {
    title: 'Home',
    metaTags: [
        {
            name: 'description',
            content: 'Concery is a platform that enhances live concert experiences. Let visitors order their drinks and merch online!'
        },
        {
            name: 'og:description',
            content: 'Concery is a platform that enhances live concert experiences. Let visitors order their drinks and merch online!'
        }
    ]
};

const noEvent = {
    title: 'no event',
    metaTags: [
        {
            name: 'description',
            content: 'There was no event found for this qr code...'
        },
        {
            name: 'og:description',
            content: 'There was no event found for this qr code...'
        }
    ]
};

const eventOver = {
    title: 'event over',
    metaTags: [
        {
            name: 'description',
            content: 'The event is over. As of right now, we are not accepting any orders anymore'
        },
        {
            name: 'og:description',
            content: 'The event is over. As of right now, we are not accepting any orders anymore'
        }
    ]
};

export {
    home,
    noEvent,
    eventOver
}