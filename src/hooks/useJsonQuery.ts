import toast from "react-hot-toast";
import useFile from "../store/useFile";
import useJson from "../store/useJson";

const useJsonQuery = () => {
  const getJson = useJson(state => state.getJson);
  const setContents = useFile(state => state.setContents);

  const transformer = async ({ value }) => {
    const { run } = await import("json_typegen_wasm");
    return run("Root", value, JSON.stringify({ output_mode: "typescript/typealias" }));
  };

  const updateJson = async (query: string, cb?: () => void) => {
    try {
      // Use a safer approach that doesn't rely on jq-web
      // Simple implementation for basic jq functionality
      const jsonData = JSON.parse(getJson());
      let result;
      
      // Handle some basic jq operations
      if (query === '.') {
        result = jsonData;
      } else if (query.startsWith('.')) {
        // Handle simple path queries like .users or .users[0]
        const path = query.substring(1).split('.');
        result = path.reduce((obj, key) => {
          if (obj === null || obj === undefined) return obj;
          
          // Handle array indexing like [0]
          const arrayMatch = key.match(/(\w+)\[(\d+)\]/);
          if (arrayMatch) {
            const [_, propName, index] = arrayMatch;
            return obj[propName]?.[parseInt(index)];
          }
          
          return obj[key];
        }, jsonData);
      } else {
        // For more complex queries, show a message
        toast.error("Complex JQ queries are not supported in this version");
        return;
      }

      setContents({ contents: JSON.stringify(result, null, 2) });
      cb?.();
    } catch (error) {
      console.error(error);
      toast.error("Unable to process the request.");
    }
  };

  const getJsonType = async () => {
    const types = await transformer({ value: getJson() });
    return types;
  };

  return { updateJson, getJsonType };
};

export default useJsonQuery;