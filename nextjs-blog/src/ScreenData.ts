class ScreenData {
  id: string;
  show: boolean;
  favorite: boolean;
  object: any;

  constructor(id = "", show = false, favorite = false, object = null) {
    this.id = id;
    this.show = show;
    this.favorite = favorite;
    this.object = object;
  }
}

export default ScreenData;
