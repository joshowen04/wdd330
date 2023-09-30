export default class LSUtilities {
  add(user, stat) {
    let statistics = this.getall(user);
    statistics.push(stat);
    localStorage.setItem(user, JSON.stringify(statistics));
  }

  remove(user, stat) {
    let statistics = this.getall(user);
    //remove the item from the list
    statistics.filter((item) => {
      item !== stat;
    });

    localStorage.setItem(user, statistics);
  }
  getall(user) {
    const statistics = JSON.parse(localStorage.getItem(`${user}`) || "[]");
    return statistics;
  }
}

