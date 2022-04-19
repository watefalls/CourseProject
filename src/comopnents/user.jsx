// import React from "react";
// import Bookmark from "./bookmark";
// import PropTypes from "prop-types";

// const User = (props) => {
//   const {
//     _id,
//     name,
//     profession,
//     bookmark,
//     completedMeetings,
//     rate,
//     toggleBookmark,
//     onDelete
//   } = props;

//   return (
//     <tr>
//       <td>{name}</td>
//       <td>
//       </td>
//       <td>{profession.name}</td>
//       <td>{completedMeetings}</td>
//       <td>{rate}</td>
//       <td>
//         <Bookmark status={bookmark} onChangeIcon={() => toggleBookmark(_id)} />
//       </td>
//       <td>
//         <button className="btn btn-danger" onClick={() => onDelete(_id)}>
//           Delete
//         </button>
//       </td>
//     </tr>
//   );
// };

// User.propTypes = {
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   qualities: PropTypes.array.isRequired,
//   profession: PropTypes.object.isRequired,
//   bookmark: PropTypes.bool.isRequired,
//   completedMeetings: PropTypes.number.isRequired,
//   rate: PropTypes.number.isRequired,
//   toggleBookmark: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired
// };

// export default User;
