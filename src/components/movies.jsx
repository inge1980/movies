import React from "react"; // , { Component } comes from Form
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import ListGroup from "./common/listGroup";
import ButtonGroup from "./common/buttonGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import Input from "./common/input";
import Form from "./common/form";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Form {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    searchQuery: "",
    sortColumn: {
      path: "title",
      order: "asc"
    },
    errors: {}
  };

  // Joi validation
  schema = {
    search: Joi.string().min(0).allow("").allow(null).label("Search")
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
    console.log("App - DidMount - movies", this.state.movies);
    console.log("App - DidMount - genres", this.state.genres);
  }

  /*
  constructor() {
    super();
    this.state.movies = getMovies();
    this.state.genres = getGenres();
    console.log("App - Constructed - movies", this.state.movies);
    console.log("App - Constructed - genres", this.state.genres);
  }
  */

  // deleting movies should be done within this component
  handleDelete = (movie) => {
    // handling the listener
    console.log("Delete: Event Handler Called", movie.title);
    // get all counters from array except the one with the given ID
    const movies = this.state.movies.filter((item) => item._id !== movie._id);
    // let react update the state with the new list of counters
    this.setState({ movies });
    // todo: when deleting last item on page 3, change to page 2
    //this.setState({ currentPage: 2 });
  };

  // liking a movie should be done within this component
  handleLike = (movie) => {
    // handling the listener
    console.log("Like: Event Handler Called", movie.title);
    // clone array using the spread operator
    const movies = [...this.state.movies];
    // get index of current movie
    const index = movies.indexOf(movie);
    // clone current movie before altering (no-no in React to change state directly)
    movies[index] = { ...movie };
    // set to the not-operator (if false then true, and vice versa)
    movies[index].liked = !movies[index].liked;
    // let react update the state with the new list of movies
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // handling the listener
    console.log("PageChange: Event Handler Called", page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    // handling the listener
    console.log("GenreSelect: Event Handler Called", genre);
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSearch = ({ currentTarget: tar }) => {
    // handling the listener
    console.log("Search: Event Handler Called", tar.value);
    this.setState({
      searchQuery: tar.value,
      selectedGenre: null,
      currentPage: 1
    });
  };

  handleSort = (sortColumn) => {
    // handling the listener

    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;

    let filtered = allMovies;
    // filter movies based on search
    if (searchQuery)
      filtered = allMovies.filter(
        (m) => m.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    // filter movies based on genre
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    // sort table based on column
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // only show movies from this page
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  //handleInputChange = ({ currentTarget: input }) => {
  //  const fields = { ...this.state.fields };
  //  fields[input.name] = input.value;
  //  this.setState({ fields });
  //};

  render() {
    console.log("Movies - Rendered");

    const { length: counter } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;

    if (counter === 0) return <p className="m-2">No movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 mt-3 col-md-3">
              <ListGroup
                items={genres}
                selectedItem={selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
              <ButtonGroup
                items={genres}
                selectedItem={selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            {/* <!-- /.col-3 --> */}
            <div className="col-12 col-md-9">
              {/* {this.renderButton("New Movie")} */}
              <Link to="new" className="btn btn-primary my-3">
                New Movie
              </Link>
              <p className="my-0 mb-n3">
                Showing {totalCount} movies from the database.
              </p>
              <div className="table-responsive">
                <Input
                  name="search"
                  value={searchQuery}
                  placeholder="Search..."
                  onChange={this.handleSearch}
                />
                <MoviesTable
                  movies={movies}
                  onLike={this.handleLike}
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
              {/*<!-- /.table-responsive --> */}
            </div>
            {/* <!-- /.col-9 --> */}
          </div>
          {/* <!-- /.row --> */}
        </div>
        {/*<!-- /.container --> */}
      </React.Fragment>
    );
  }
}

export default Movies;
