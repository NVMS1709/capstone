import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForumTitles } from '../../store'
import { Link } from 'react-router-dom'

class Topics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFilter: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.props.getForumTitles()
  }

  onChange(event) {
    this.setState({ searchFilter: event.target.value })
  }

  onSubmit(event) {}

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
            <button>Add Forum Topic</button>
          </div>
          <div className="filter-search">
            {this.state.searchFilter.length > 0 ? (
              <span>
                Searching For:{' '}
                <span className="search-color">
                  "{this.state.searchFilter}"
                </span>
              </span>
            ) : (
              <span>
                Filtered By: <span className="search-color">Popularity</span>
              </span>
            )}
          </div>
        </div>
        {filteredForum.length > 0
          ? filteredForum.map(forum => {
              return (
                <div key={forum.title} className="forum-main">
                  <div key={forum.id} className="forum-main-item-title">
                    <Link to={`/forum/${forum.title}`} className="forum-link">
                      {forum.title}
                    </Link>
                    <div key={forum.userId} className="forum-main-item-details">
                      <p>Threads: {forum.commentNum}, (posted) 01/01/1900</p>
                    </div>
                  </div>
                </div>
              )
            })
          : this.props.forum.map(forum => {
              return (
                <div key={forum.title} className="forum-main">
                  <div key={forum.id} className="forum-main-item-title">
                    <p>{forum.title}</p>
                    <div key={forum.userId} className="forum-main-item-details">
                      <p>Number: {forum.commentNum}, other info: here</p>
                    </div>
                  </div>
                </div>
              )
            })}
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
