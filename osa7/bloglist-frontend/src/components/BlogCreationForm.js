import React from 'react'

const BlogCreationForm = (props) => (
    <form onSubmit={props.handleAddBlog}>
        <div>
            <div>
                Title <input
                    value={props.newBlogTitle}
                    name="newBlogTitle"
                    onChange={props.handleInputFieldChange}
                />
            </div>
            <div>
                Author <input
                    value={props.newBlogAuthor}
                    name="newBlogAuthor"
                    onChange={props.handleInputFieldChange}
                />
            </div>
            <div>
                URL <input
                    value={props.newBlogUrl}
                    name="newBlogUrl"
                    onChange={props.handleInputFieldChange}
                />
            </div>
            <button type="submit">Save</button>
        </div>
    </form>
 
)

export default BlogCreationForm