"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import { useLogin } from "@/hooks/muataions/useLoginMutation";
import { LoginType } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [loginValue, setLoginValue] = useState<LoginType>({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleLoginSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginValue.email) {
      alert("이메일을 입력해주세요");
      return;
    }

    if (!loginValue.password) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    if (confirm("로그인 하시겠습니까?")) {
      loginMutation.mutate(loginValue, {
        onSuccess: () => {
          alert("로그인 완료");
          router.replace("/");
        },
        onError: (error) => {
          console.error("로그인 실패", error);
          alert("로그인 실패");
        },
      });
    }
  };

  return (
    <section>
      <PageTitle className="text-center">로그인</PageTitle>
      <form className="w-full flex justify-center" onSubmit={handleLoginSubmit}>
        <div className="w-full max-w-100 flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="text-[0.8rem] sm:text-[0.9rem] font-semibold text-label-alternative"
            >
              이메일
            </label>
            <Input
              id="email"
              placeholder="이메일을 입력해주세요"
              type="email"
              value={loginValue.email}
              required
              className="text-[0.8rem] sm:text-[0.9rem] text-label-alternative mt-1"
              onChange={(e) =>
                setLoginValue((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-[0.8rem] sm:text-[0.9rem] font-semibold text-label-alternative"
            >
              비밀번호
            </label>
            <Input
              id="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              value={loginValue.password}
              required
              className="text-[0.8rem] sm:text-[0.9rem] text-label-alternative mt-1"
              onChange={(e) =>
                setLoginValue((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button type="submit" size="lg" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "로그인중..." : "로그인"}
            </Button>
            <Button type="button" size="lg" variant="outline">
              <Link href="/signup">회원가입</Link>
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
