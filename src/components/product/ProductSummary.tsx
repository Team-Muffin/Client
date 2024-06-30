import React from "react";

interface ProductContent {
  title: string;
  content: string | number;
}

const ProductSummary: React.FC<{ benefits: ProductContent[] }> = ({
  benefits,
}) => {
  return (
    <div className="flex mt-[2.5vh] bg-[#F4F3F8] rounded-[1rem] px-[1.2vh] pt-[1.2vh] pb-[1.2vh]">
      {benefits && (
        <table className="m-[1.5vw] text-[0.85rem] ">
          <tbody>
            {benefits.map((benefit, index) => (
              <tr key={index}>
                {benefit.content !== null ? (
                  <>
                    <td className="mr-[3vw] w-[30vw] text-[#80848B] p-[1.2vw] pt-0">
                      {benefit.title}
                    </td>

                    <td className="p-[1.2vw] pt-0">{benefit.content}</td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductSummary;
