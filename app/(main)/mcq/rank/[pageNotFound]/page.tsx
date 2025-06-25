import FuzzyText from "@/components/pageNotFound";

export default function PageNotFound({params}:{params:{pageNotFound:string}}){
    const pathName = params.pageNotFound
    return <div className="h-screen  flex justify-center items-center flex-col">
        <FuzzyText 
            baseIntensity={0.2} 
            >
            404  Page Not Found 
        </FuzzyText>

        <br/>
         <FuzzyText 
            baseIntensity={0.2} 
            >
            {pathName}
        </FuzzyText>

    </div>
}