import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PagerLink = props => (
  <PaginationItem>
    <PaginationLink onClick={() => props.callBack()}>
      {props.linkText}
    </PaginationLink>
  </PaginationItem>
);

const Pager = (props) => {
  if (!props.callBack) {
    console.warn('Add a callBack function property on the pager that accepts a page param');
  }

  const showPager = (props.totalPages > 0);
  const previous = (props.pageNumber > 1);
  const next = (props.pageNumber !== props.totalPages) && (props.totalPages > 1);

  return (
    <div className="mt-2">
      {showPager &&
        <Pagination>
          {previous &&
            <PagerLink linkText="First" callBack={() => props.callBack(1)} refPage={props.refPage} />
          }
          {previous &&
            <PagerLink linkText="Previous" callBack={() => props.callBack(props.pageNumber - 1)} refPage={props.refPage} />
          }
          <span className="mr-2 ml-2 pt-2">Page {props.pageNumber} of {props.totalPages}</span>
          {next &&
            <PagerLink linkText="Next" callBack={() => props.callBack(props.pageNumber + 1)} refPage={props.refPage} />
          }
          {next &&
            <PagerLink linkText="Last" callBack={() => props.callBack(props.totalPages)} refPage={props.refPage} />
          }
        </Pagination>
      }
    </div>
  );
};

export default Pager;
