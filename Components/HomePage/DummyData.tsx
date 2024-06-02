export let icons = [
  require("../../assets/Money.png"),
  require("../../assets/Overtime.png"),
  require("../../assets/Vacation.png"),
  require("../../assets/Car.png"),
];

interface CommentsModel {
  id: number;
  icon: any;
  commentorName: string;
  description: string;
}

let DUMMY_COMMENTS: CommentsModel[] = [
  {
    id: 1,
    icon: require("../../assets/Pic1.png"),
    commentorName: "Moderator",
    description: "youre doing a great job",
  },
  {
    id: 2,
    icon: require("../../assets/Pic2.png"),
    commentorName: "Hr",
    description: "youre doing a great job",
  },
  {
    id: 3,
    icon: require("../../assets/Pic3.png"),
    commentorName: "Manager",
    description: "youre doing a great job",
  },
];
