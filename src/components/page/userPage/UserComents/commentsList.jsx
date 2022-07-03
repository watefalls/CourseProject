import React, { useEffect } from "react";
import Coment from "./coment";
import _ from "lodash";
import AddComment from "./addComment";
import { nanoid } from "nanoid";
import Loader from "../../../ui/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  comentCreated,
  comentRemoved,
  getcoments,
  getLoadingcomentsStatus,
  loadcomentsList
} from "../../../../store/comentsSlice";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../../../store/users";

const CommentsList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingcomentsStatus());
  const params = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const coments = useSelector(getcoments());

  useEffect(() => {
    dispatch(loadcomentsList(params.id));
  }, [params.id]);

  const handleSubmit = (data) => {
    const coment = {
      ...data,
      pageId: params.id,
      created_at: Date.now(),
      userId: currentUserId,
      _id: nanoid()
    };
    dispatch(comentCreated(coment));
  };

  const handleRemoveComent = (id) => {
    dispatch(comentRemoved(id));
  };

  const sortedComents = _.orderBy(coments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddComment onSubmit={handleSubmit} />
        </div>
      </div>
      {!isLoading ? (
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
        <Loader />
      )}
    </>
  );
};

export default CommentsList;
