"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PageTitle from "@/components/common/PageTitle";
import { useLogin } from "@/hooks/muataions/useLoginMutation";
import { LoginType } from "@/types/auth";
import { useState } from "react";

const LoginPage = () => {
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
      <PageTitle>로그인</PageTitle>
      <form className="w-60" onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <Input
            id="email"
            placeholder="이메일을 입력해주세요"
            type="email"
            value={loginValue.email}
            required
            onChange={(e) =>
              setLoginValue((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={loginValue.password}
            required
            onChange={(e) =>
              setLoginValue((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        <Button type="submit" size="sm" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "로그인중..." : "로그인"}
        </Button>
      </form>
    </section>
  );
};

export default LoginPage;
