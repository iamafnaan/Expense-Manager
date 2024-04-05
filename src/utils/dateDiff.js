function dateDiff(updatedDate) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - updatedDate;

  var seconds = timeDifference / 1000;
  var minutes = timeDifference / (1000 * 60);
  var hours = timeDifference / (1000 * 60 * 60);
  var days = timeDifference / (1000 * 60 * 60 * 24);

  if (days < 1) {
    if (hours < 1) {
      if (minutes < 1) {
        return Math.trunc(seconds) + " seconds";
      } else {
        return Math.trunc(minutes) + " mins";
      }
    } else {
      return Math.trunc(hours) + " hours";
    }
  } else {
    return Math.trunc(days) + " days";
  }
}

export { dateDiff };
