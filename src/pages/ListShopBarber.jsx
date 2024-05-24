import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Popover, Input } from "antd";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const count = 3;
const fakeDataUrl = `https://664db6b2ede9a2b556548a08.mockapi.io/api/salon/salon`;

function ListShopBarber(props) {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const [openPopoverId, setOpenPopoverId] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const hide = () => {
    setOpenPopoverId(null);
  };

  const handleOpenChange = (newOpen, id) => {
    setOpenPopoverId(newOpen ? id : null);
  };

  useEffect(() => {
    fetch(`${fakeDataUrl}?page=1&limit=${count}`)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res);
        setList(res);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    const nextPage = page + 1;

    fetch(`${fakeDataUrl}?page=${nextPage}&limit=${count}`)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res);
        setData(newData);
        setList(newData);
        setLoading(false);
        setPage(nextPage);
        window.dispatchEvent(new Event("resize"));
      });
  };

  const handleFilter = () => {
    if (!filterName && !filterLocation) {
      setList(data);
      return;
    }

    const filteredList = data.filter(
      (item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase()) &&
        item.address.toLowerCase().includes(filterLocation.toLowerCase())
    );
    setList(filteredList);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Load more</Button>
      </div>
    ) : null;

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "175px",
          marginLeft: "250px",
          marginRight: "250px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Input
            placeholder="Filter by salon name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={{ width: 200, marginRight: 10 }}
          />
          <Input
            placeholder="Filter by location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            style={{ width: 200, marginRight: 10 }}
          />
          <Button onClick={handleFilter}>Apply Filters</Button>
        </div>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Link to={`/create_shop/${item.id}`} key="list-loadmore-edit">
                  edit
                </Link>,
                <Popover
                  content={
                    <>
                      <Link
                        to={`/create_shop/${item.id}`}
                        key="list-loadmore-add-employees"
                      >
                        Add employees
                      </Link>
                      <Link
                        to={`/create_shop/${item.id}`}
                        key="list-loadmore-add-services"
                      >
                        Add services
                      </Link>
                      <a onClick={hide}>Close</a>
                    </>
                  }
                  title="Options"
                  trigger="click"
                  open={openPopoverId === item.id}
                  onOpenChange={(newOpen) => handleOpenChange(newOpen, item.id)}
                >
                  <a type="primary">more</a>
                </Popover>,
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.img} />}
                  title={
                    <Link to={`/create_shop/${item.id}`}>{item.name}</Link>
                  }
                  description={item.description}
                />
                <div>content</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ListShopBarber;
