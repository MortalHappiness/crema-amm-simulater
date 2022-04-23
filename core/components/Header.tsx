import PageHeader from "antd/lib/page-header";

interface IHeader {
  title?: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: IHeader) => {
  return (
    <PageHeader
      className="site-page-header bg-white"
      title={title}
      subTitle={subtitle}
    />
  );
};

export default Header;
