import "../../styles/components/listing/PostSelector.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const PostSelector = ({ post }: { post:any }) => {
    return (<>
        <div className="post_selector">
            <div className="image" style={{
                backgroundImage: `url(/api/posts/${post._id}/image)`
            }}></div>
            <div className="metadata_row">
                <div className="container">
                    <div className="icon">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <p className="text">{post.likes.length}</p>
                </div>
            </div>
        </div>
    </>)
}