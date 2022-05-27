import React, { useEffect, useState } from "react";
import api from "../../../../api";
import { useParams } from "react-router-dom";
import Coment from "./coment";
import _ from "lodash";
import AddComment from "./addComment";

const CommentsList = () => {
  const { id } = useParams();
  const [coments, setComents] = useState([]);

  useEffect(() => {
    api.comments.fetchCommentsForUser(id).then((data) => setComents(data));
  }, []);

  const handleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: id })
      .then((data) => setComents([...coments, data]));
  };

  const handleRemoveComent = (id) => {
    api.comments
      .remove(id)
      .then((id) => setComents(coments.filter((coment) => coment._id !== id)));
  };

  // const sertedComents = coments.sort((a, b) => a.created_at < b.created_at);
  const sortedComents = _.orderBy(coments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddComment onSubmit={handleSubmit} />
        </div>
      </div>
      {coments.length ? (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {sortedComents.map((coment) => (
              <Coment
                key={coment._id}
                {...coment}
                onRemove={() => handleRemoveComent(coment._id)}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CommentsList;
