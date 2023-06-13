import * as dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

function formatDate(date) {
  return dayjs(date).fromNow();
}

export { formatDate };
