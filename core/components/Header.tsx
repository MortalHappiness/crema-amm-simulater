import PageHeader from "antd/lib/page-header";
import Image from "next/image";
import { GithubFilled } from "@ant-design/icons";
import { REPO_URL } from "../constants";

interface IHeader {
  title?: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: IHeader) => {
  return (
    <PageHeader
      onBack={() => {}}
      backIcon={
        <Image src="/logo_crema.png" alt="logo" width="150" height="36" />
      }
      style={{ borderBottom: "1px solid #3f434e" }}
      className="site-page-header"
      title={title}
      subTitle={subtitle}
      ghost={true}
      extra={
        <GithubFilled
          className="text-white text-xl"
          onClick={() => {
            window.location.assign(REPO_URL);
          }}
        />
      }
    />
  );
};

export default Header;
