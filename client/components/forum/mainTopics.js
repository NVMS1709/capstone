import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForumTitles } from '../../store'
import { Link } from 'react-router-dom'
import AddTopic from './addTopic'

class Topics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFilter: '',
      forumAdd: true
    }
    this.onChange = this.onChange.bind(this)
    this.toggleForumAdd = this.toggleForumAdd.bind(this)
  }

  componentDidMount() {
    this.props.getForumTitles()
  }

  toggleForumAdd() {
    this.setState({ forumAdd: !this.state.forumAdd })
  }

  onChange(event) {
    this.setState({ searchFilter: event.target.value })
  }

  render() {
    const filteredForum =
      this.props &&
      this.props.forum.filter(forum => {
        let tempForum = forum.title.toLowerCase()
        let tempSearchFilter = this.state.searchFilter.toLowerCase()
        return tempForum.indexOf(tempSearchFilter) > -1
      })
    return (
      <div>
        {this.state.forumAdd ? (
          <div>
            <div className="header-forum">
              <h4>Discussion</h4>
              <div className="search-forum">
                <p>
                  Search Titles:{'  '}
                  <input
                    size="40"
                    value={this.state.searchFilter}
                    onChange={this.onChange}
                  />
                </p>
                {this.props.user.id ? (
                  <button onClick={this.toggleForumAdd}>Add Forum Topic</button>
                ) : (
                  ''
                )}
              </div>

              <div className="filter-search">
                {this.state.searchFilter.length > 0 ? (
                  <span>
                    Searching Titles For:{' '}
                    <span className="search-color">
                      "{this.state.searchFilter}"
                    </span>
                  </span>
                ) : (
                  <span>
                    Filtered By:{' '}
                    <span className="search-color">Popularity</span>
                  </span>
                )}
              </div>
            </div>
            {this.state.searchFilter.length > 0
              ? filteredForum.map(forum => {
                  return (
                    <div key={forum.title} className="forum-main">
                      <div key={forum.id} className="forum-main-item-title">
                        <Link
                          to={`/forum/${forum.title}`}
                          className="forum-link"
                        >
                          {forum.title}
                        </Link>
                        <div
                          key={forum.userId}
                          className="forum-main-item-details"
                        >
                          <p>
                            Replies: {forum.forumComments.length} - Created By:{' '}
                            {forum.user.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              : this.props.forum
                  .sort(
                    (a, b) => b.forumComments.length - a.forumComments.length
                  )
                  .map(forum => {
                    return (
                      <div key={forum.title} className="forum-main">
                        <div key={forum.id} className="forum-main-item-title">
                          <Link
                            to={`/forum/${forum.title}`}
                            className="forum-link"
                          >
                            {forum.title}
                          </Link>
                          <div
                            key={forum.id}
                            className="forum-main-item-details"
                          >
                            <p>
                              Replies: {forum.forumComments.length} - Created
                              By: {forum.user.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
          </div>
        ) : (
          <AddTopic toggle={this.toggleForumAdd.bind(this)} />
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    forum: state.forum,
    comments: state.comments,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getForumTitles: () => dispatch(getForumTitles())
  }
}

export default connect(mapState, mapDispatch)(Topics)
