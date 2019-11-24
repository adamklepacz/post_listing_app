import React, { PureComponent } from 'react';
import { Container } from '@material-ui/core';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

import GridItem from './components/GridItem';
import ListItem from './components/ListItem';
import DashboardHeader from './components/DashboardHeader';
import {
  DISPLAY_MODE,
  QUERY_PARAMS,
  QUERY_VALUES,
  SORT_OPTION,
  USER_DATA
} from '../../common/enums';
import AuthorModal from '../../common/components/AuthorInfoModal';
import Overlay from '../../common/components/Overlay';
import { getData } from '../../common/fetchMethods';
import { API_DATA } from '../../common/config';
import { readLocalStorage, updateUrlParams } from '../../common/helpers';

class Dashboard extends PureComponent {
  constructor() {
    super();

    this.state = {
      apiUrl: `${API_DATA.URL}/${API_DATA.GET_POSTS}`,
      authorId: null,
      dateDropdownDefaultValue: SORT_OPTION.NEWEST_FIRST,
      displayMode: DISPLAY_MODE.LIST,
      isAuthorModalVisible: false,
      nameDropdownDefaultValue: SORT_OPTION.ASCENDING,
      pagination: null,
      posts: [],
      userToken: null
    };
  }

  componentDidMount() {
    this.getUserToken();
  }

  getUserToken = () => {
    const { userToken } = readLocalStorage(USER_DATA.TOKEN);

    this.setState({ userToken }, () => this.fetchPosts());
  };

  fetchPosts = async () => {
    const { userToken, apiUrl } = this.state;

    try {
      const result = await getData(apiUrl)(userToken);
      const { data, pagination } = result;

      this.setState({ posts: data, pagination });
    } catch (error) {
      /**
       * This not a good practice to handle errors
       * this is only temporary solution
       */
      // eslint-disable-next-line no-console
    }
  };

  handleDisplayModeChange = event => {
    const { value } = event.target;

    this.setState({ displayMode: value });
  };

  handleSortingByName = event => {
    const { value } = event.target;
    const { apiUrl } = this.state;
    const paramsToUpdate = [
      {
        param: QUERY_PARAMS.ORDER,
        value:
          value === SORT_OPTION.ASCENDING
            ? QUERY_VALUES.ASCENDING
            : QUERY_VALUES.DESCENDING
      },
      {
        param: QUERY_PARAMS.ORDER_BY,
        value: QUERY_VALUES.TITLE
      }
    ];

    const updatedUrl = updateUrlParams(apiUrl)(paramsToUpdate);

    this.buildApiUrl(updatedUrl)('nameDropdownDefaultValue', value);
  };

  handleSortingByDate = event => {
    const { value } = event.target;
    const { apiUrl } = this.state;

    const paramsToUpdate = [
      {
        param: QUERY_PARAMS.ORDER,
        value:
          value === SORT_OPTION.OLDEST_FIRST
            ? QUERY_VALUES.ASCENDING
            : QUERY_VALUES.DESCENDING
      },
      {
        param: QUERY_PARAMS.ORDER_BY,
        value: QUERY_VALUES.DATE
      }
    ];
    const updatedUrl = updateUrlParams(apiUrl)(paramsToUpdate);

    this.buildApiUrl(updatedUrl)('dateDropdownDefaultValue', value);
  };

  buildApiUrl = url => (sortOption, sortValue) => {
    this.setState(
      {
        apiUrl: url,
        [sortOption]: sortValue
      },
      this.fetchPosts
    );
  };

  handlePageClick = selectedPage => {
    const { selected } = selectedPage;
    const page = selected + 1;
    const { apiUrl } = this.state;

    const paramsToUpdate = [
      {
        param: QUERY_PARAMS.PAGE,
        value: page
      }
    ];
    const updatedUrl = updateUrlParams(apiUrl)(paramsToUpdate);

    this.setState(
      {
        apiUrl: updatedUrl
      },
      this.fetchPosts
    );
  };

  showAuthorModal = authorId =>
    this.setState({ isAuthorModalVisible: true, authorId });

  hideAuthorModal = () =>
    this.setState({ isAuthorModalVisible: false, authorId: null });

  render() {
    const {
      authorId,
      dateDropdownDefaultValue,
      displayMode,
      isAuthorModalVisible,
      nameDropdownDefaultValue,
      pagination,
      posts
    } = this.state;

    if (!pagination) {
      return null;
    }

    const { totalPages } = pagination;

    return (
      <>
        <Container className="dashboard__container" maxWidth="xl">
          <DashboardHeader
            dateDropdownDefaultValue={dateDropdownDefaultValue}
            displayMode={displayMode}
            nameDropdownDefaultValue={nameDropdownDefaultValue}
            onDateDropdownChange={this.handleSortingByDate}
            onDisplayModeChange={this.handleDisplayModeChange}
            onNameDropdownChange={this.handleSortingByName}
          />
          <div
            className={classNames('dashboard__container-body', {
              'dashboard__container-body--grid':
                displayMode === DISPLAY_MODE.GRID,
              'dashboard__container-body--list':
                displayMode === DISPLAY_MODE.LIST
            })}
          >
            {posts.map(post =>
              displayMode === DISPLAY_MODE.GRID ? (
                <GridItem data={post} key={`${post.id}`} />
              ) : (
                <ListItem
                  data={post}
                  key={`${post.id}`}
                  onInfoClick={this.showAuthorModal}
                />
              )
            )}
          </div>
          <footer className="dashboard__footer">
            <ReactPaginate
              activeClassName="active"
              breakClassName="break-me"
              breakLabel="..."
              containerClassName="pagination"
              marginPagesDisplayed={1}
              nextLabel=">"
              onPageChange={this.handlePageClick}
              pageCount={totalPages}
              pageRangeDisplayed={2}
              previousLabel="<"
              subContainerClassName="pages pagination"
            />
          </footer>
        </Container>
        {isAuthorModalVisible && (
          <>
            <Overlay />
            <AuthorModal onClose={this.hideAuthorModal} authorId={authorId} />
          </>
        )}
      </>
    );
  }
}

export default Dashboard;
