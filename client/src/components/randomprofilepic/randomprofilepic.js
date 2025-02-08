import avatar1 from "../../assets/images/avatars/avatar1.svg";
import avatar2 from "../../assets/images/avatars/avatar2.svg";
import avatar3 from "../../assets/images/avatars/avatar3.svg";
import avatar4 from "../../assets/images/avatars/avatar4.svg";
import avatar5 from "../../assets/images/avatars/avatar5.svg";
import avatar6 from "../../assets/images/avatars/avatar6.svg";
import avatar7 from "../../assets/images/avatars/avatar7.svg";
import avatar8 from "../../assets/images/avatars/avatar8.svg";
import avatar9 from "../../assets/images/avatars/avatar9.svg";
import avatar10 from "../../assets/images/avatars/avatar10.svg";

const images = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
];

const getRandomProfilePic = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export { getRandomProfilePic, images };
