import React, { Fragment, useEffect } from "react";
import "./authorDetailScreen.scss";

import Tabs from "../TabsComponents/Tabs";
import About from "../TabsComponents/About";
import AuthorStories from "../TabsComponents/AuthorStories";
import { useDispatch, useSelector } from "react-redux";
import { authorInformation } from "../../redux/actions/userAction";
import LoadingBox from "../utilityComponents/LoadingBox";
import MessageBox from "../utilityComponents/MessageBox";
import ProfileUpperbox from "../StoryComponents/ProfileUpperbox";

function AuthorDetailScreen(props) {
  const authorId = props.match.params.authorId;

  const dispatch = useDispatch();

  const authorInfo = useSelector((state) => state.authorInfo);

  const { loading, error, authorBio } = authorInfo;

  useEffect(() => {
    console.log(authorId);
    dispatch(authorInformation(authorId));
  }, [authorId, dispatch]);

  const data = [
    {
      id: 1,
      name: "About Author",
      content: () => <About authorBio={authorBio} />,
      state: "active",
    },
    {
      id: 2,
      name: "Author Stories",
      content: () => <AuthorStories authorId={authorId} />,
      state: "inactive",
    },
  ];
  const defaultImageLink = "uploads/default.jpeg";
  return (
    <div className="container">
      <div className="author-box">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          authorBio && (
            <Fragment>
              <ProfileUpperbox
                username={authorBio.username}
                email={authorBio.email}
                profileImage={
                  authorBio.profileImage === ""
                    ? defaultImageLink
                    : authorBio.profileImage
                }
              />

              <div className="author-box-body">
                <Tabs data={data} />
              </div>
            </Fragment>
          )
        )}
      </div>
    </div>
  );
}

export default AuthorDetailScreen;
