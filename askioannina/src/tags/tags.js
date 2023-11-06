function Tags(){

    const tags = ["Travel", "Ask", "Ioannina"];

    return(
        <p>
            {tags.map((tag,i)=>{
                    return(
                        <>
                        <span className={ (i===0)?"w3-tag w3-black w3-margin-bottom": "w3-tag w3-light-grey w3-small w3-margin-bottom"}>{tag}</span>&nbsp;
                        </>
                    )
            })}
        </p>
    );
}

export default Tags
