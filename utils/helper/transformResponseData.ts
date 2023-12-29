import {
  IResponseData,
  IResponseFromAxios,
} from "../../@types/responseFromApi";

export function transformResponse(originalResponse: IResponseFromAxios) {
  if (!originalResponse || !originalResponse.data) {
    return null;
  }

  const transformedData = originalResponse.data.data.map(
    (item: IResponseData) => {
      const transformedItem = {
        id: item.id,
        name: item.attributes && item.attributes.name,
        username: item.attributes && item.attributes.username,
        email: item.attributes && item.attributes.email,
        contact: item.attributes && item.attributes.contact,
        isActive: item.attributes && item.attributes.isActive,
      };

      return transformedItem;
    }
  );

  return {
    data: transformedData,
  };
}
