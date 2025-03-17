import React, { ChangeEvent, SyntheticEvent } from "react";
import { Input } from "antd";
import styles from './Search.css'
interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}: Props): JSX.Element => {
  return (
    <section className="relative bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <form
          className="form relative flex flex-col w-full p-10 space-y-4 bg-darkBlue rounded-lg md:flex-row md:space-y-0 md:space-x-3"
          onSubmit={onSearchSubmit}
        >
          <Input onChange={handleSearchChange} className={styles.search} id="search-input" placeholder="Search companies" value={search} />
        </form>
      </div>
    </section>
  );
};

export default Search;
