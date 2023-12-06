import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Listgroup from "./common/listGroup";
import Pagination from "./common/Pagination";
import { paginate } from "./utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }
  render() {
    return (
      <>
        {this.state.movies.length === 0
          ? "There are no movies in the database"
          : this.showAllMovies()}
      </>
    );
  }

  showAllMovies = () => {
    const { pageSize, currentPage, selectedGenre, genres, sortColumn } =
      this.state;

    const { totalCount, data } = this.getPagedData();
    return (
      <div class="row m-2">
        <div className="col-3">
          <Listgroup
            onItemSelect={this.handleGenreSelect}
            items={genres}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={data}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  };

  handleGenreSelect = (item) => {
    this.setState({ selectedGenre: item });
    this.setState({ currentPage: 1 });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleDelete = (id) => {
    let movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies: movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { selectedGenre, movies, sortColumn, currentPage, pageSize } =
      this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const currentPagemovies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: currentPagemovies };
  };
}

export default Movie;
