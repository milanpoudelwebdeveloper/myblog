import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import MainLayout from "@components/Admin/Common/MainLayout";
import { getCategories } from "@/src/services/category";
import { useCustomToast } from "@/src/hooks/useCustomToast";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import { addBlog } from "@/src/services/blog";
import hljs from "highlight.js";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
} from "@mdxeditor/editor";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  ["link"],
  [{ indent: "-1" }, { indent: "+1" }],

  [{ header: [1, 2, 3, false] }],

  [{ align: [] }],
];
const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: toolbarOptions,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

hljs.configure({
  // optionally configure hljs
  languages: [
    "javascript",
    "python",
    "c",
    "c++",
    "java",
    "HTML",
    "css",
    "matlab",
  ],
});

const AddBlog = ({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null | string>(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  let imageUrl = "";

  const { showToast } = useCustomToast();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const MDXEditor = useMemo(
    () => dynamic(() => import("@mdxeditor/editor"), { ssr: false }),
    []
  );

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        showToast(error, "error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addBlog(
        title,
        coverImage as File,
        content,
        selectedCategory
      );
      if (response?.data) {
        showToast(response?.data?.message, "success");
      }
    } catch (error: any) {
      showToast(error, "error");
    }
  };

  if (coverImage && typeof coverImage !== "string") {
    imageUrl = URL.createObjectURL(coverImage);
  } else {
    imageUrl = coverImage as string;
  }

  return (
    <MainLayout>
      <Box>
        <Text fontSize="lg" fontWeight="500" textAlign="center" color="#1814F3">
          Add Blog
        </Text>
        <Divider
          mt={3}
          borderColor="#1814F3"
          w={10}
          borderWidth={2}
          mx="auto"
        />
        <Box mt={10}>
          <form onSubmit={submitHandler}>
            <Box alignItems="center" px={20} gap={20} mx="auto">
              <FormControl maxW={400} mx="auto" mb={10}>
                <FormLabel color="#232323" fontSize="md">
                  Title
                </FormLabel>
                <Input
                  type="text"
                  borderColor="#DFEAF2"
                  borderRadius={17}
                  bg="#FFF"
                  _placeholder={{ color: "#718EBF" }}
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              {imageUrl ? (
                <Image
                  borderRadius="full"
                  w={20}
                  h={20}
                  src={imageUrl}
                  alt="placeholder"
                  mx="auto"
                />
              ) : (
                <Center mt={4}>
                  <Input
                    type="file"
                    mx="auto"
                    maxW={400}
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setCoverImage(e.target.files[0]);
                    }}
                    name="coverImage"
                  />
                </Center>
              )}
              <Select onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((category: any, index: number) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
              />
              <Button type="submit">Submit</Button>
              <MDXEditor
                plugins={[
                  // Example Plugin Usage
                  headingsPlugin(),
                  listsPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  markdownShortcutPlugin(),
                ]}
                {...props}
                ref={editorRef}
              />
            </Box>
          </form>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default AddBlog;
