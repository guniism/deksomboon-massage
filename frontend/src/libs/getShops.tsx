import { MassageJson } from "../../interface";

const getShops = async (): Promise<MassageJson> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/massage-shops`);
  if (!response.ok) {
    throw Error("Failed to fetch shops");
  }
  const jsonfile = await response.json();
  return jsonfile;
};

export default getShops;
